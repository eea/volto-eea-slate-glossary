import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import { GlossaryElement, GlossaryPopupValue } from './render';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

jest.mock('semantic-ui-react', () => ({
  ...jest.requireActual('semantic-ui-react'),
  Popup: ({ content, trigger, children }) => {
    return (
      <div className="popup">
        <div className="trigger">{trigger}</div>
        <div className="content">{content}</div>
        {children}
      </div>
    );
  },
}));

const mockStore = configureStore([]);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
    formatMessage: jest.fn(),
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
  screen: {
    page: {
      width: 768,
    },
  },
});

describe('GlossaryElement', () => {
  const validGlossaryTerm = JSON.stringify({
    term: 'Test Term',
    definition: 'Test Definition',
    sources: [
      {
        link: 'http://testsource.com',
        organisation: 'Test Organisation',
        title: 'Test source',
      },
    ],
  });

  it('renders correctly in view mode with valid glossary term', () => {
    const { container } = render(
      <Provider store={store}>
        <GlossaryElement
          mode="view"
          element={{ data: { glossary_term: validGlossaryTerm } }}
        />
      </Provider>,
    );
    expect(
      container.querySelector('a[href="http://testsource.com"]'),
    ).toBeInTheDocument();
  });

  it('does not render Popup when mode is not view', () => {
    render(
      <Provider store={store}>
        <GlossaryElement
          mode="edit"
          element={{ data: { glossary_term: validGlossaryTerm } }}
        />
      </Provider>,
    );
    expect(screen.queryByText('http://testsource.com')).not.toBeInTheDocument();
  });
});

describe('GlossaryPopupValue', () => {
  it('renders correctly with valid glossaryTerm', () => {
    const glossaryTerm = JSON.stringify({
      term: 'Test Term',
      definition: 'Test Definition',
      sources: [
        {
          link: 'http://testsource.com',
          organisation: 'Test Organisation',
          title: 'Test Source',
        },
      ],
    });
    render(
      <Provider store={store}>
        <GlossaryPopupValue glossaryTerm={glossaryTerm} />
      </Provider>,
    );
    expect(screen.getByText('Test Term')).toBeInTheDocument();
    expect(screen.getByText('Test Definition')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Test Source, Test Organisation' }),
    ).toHaveAttribute('href', 'http://testsource.com');
  });

  it('renders "No term selected" when glossaryTerm is absent', () => {
    render(
      <Provider store={store}>
        <GlossaryPopupValue />
      </Provider>,
    );
    expect(screen.getByText('No term selected')).toBeInTheDocument();
  });

  it('renders plain text source when source does not start with http', () => {
    const glossaryTerm = JSON.stringify({
      term: 'Test Term',
      definition: 'Test Definition',
      sources: [
        {
          link: '',
          organisation: 'Test Organisation',
          title: 'Test Source',
        },
      ],
    });
    render(
      <Provider store={store}>
        <GlossaryPopupValue glossaryTerm={glossaryTerm} />
      </Provider>,
    );
    expect(
      screen.getByText('Test Source, Test Organisation'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Test Source, Test Organisation' }),
    ).not.toBeInTheDocument();
  });
});
