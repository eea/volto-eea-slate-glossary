import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import { GlossaryPopupValue, GlossaryElement } from './render';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureMockStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('GlossaryPopupValue', () => {
  it('renders with valid glossaryTerm', () => {
    const validGlossaryTerm = JSON.stringify({
      term: 'Test Term',
      definition: 'Test Definition',
      source: 'http://testsource.com',
    });
    const { getByText } = render(
      <Provider store={store}>
        <GlossaryPopupValue glossaryTerm={validGlossaryTerm} />,
      </Provider>,
    );
    expect(getByText('Test Term')).toBeInTheDocument();
    expect(getByText('Test Definition')).toBeInTheDocument();
    expect(getByText('http://testsource.com')).toBeInTheDocument();
  });

  it('renders with valid glossaryTerm that doesnt start with http', () => {
    const validGlossaryTerm = JSON.stringify({
      term: 'Test Term',
      definition: 'Test Definition',
      source: 'www.testsource.com',
    });
    const { getByText } = render(
      <Provider store={store}>
        <GlossaryPopupValue glossaryTerm={validGlossaryTerm} />,
      </Provider>,
    );
    expect(getByText('Test Term')).toBeInTheDocument();
    expect(getByText('Test Definition')).toBeInTheDocument();
    expect(getByText('www.testsource.com')).toBeInTheDocument();
  });

  it('renders "No term selected" when glossaryTerm is invalid', () => {
    const { getByText } = render(
      <Provider store={store}>
        <GlossaryPopupValue glossaryTerm={''} />,
      </Provider>,
    );
    expect(getByText(/No term selected/i)).toBeInTheDocument();
  });
});

describe('GlossaryElement', () => {
  const mockElement = {
    data: {
      uid: '1',
      glossary_term: JSON.stringify({
        term: 'Test Term',
        definition: 'Test Definition',
        source: 'http://testsource.com',
      }),
      popup_position: 'top left',
    },
  };

  it('renders in view mode with valid data', () => {
    const { container } = render(
      <Provider store={store}>
        <GlossaryElement element={mockElement} mode="view" />,
      </Provider>,
    );
    expect(container.querySelector('#ref-1')).toBeInTheDocument();
  });

  it('renders correctly in edit mode', () => {
    const { container } = render(
      <Provider store={store}>
        <GlossaryElement element={mockElement} mode="edit" />,
      </Provider>,
    );
    expect(container.querySelector('#label_ref-1')).toBeInTheDocument();
  });

  it('renders correctly in edit mode', () => {
    render(
      <Provider store={store}>
        <GlossaryElement element={{}} mode="edit" />,
      </Provider>,
    );
  });

  it('renders correctly in edit mode', () => {
    const { container } = render(
      <Provider store={store}>
        <GlossaryElement
          element={{
            data: {
              uid: '1',
              glossary_term: JSON.stringify({
                term: 'Test Term',
                definition: 'Test Definition',
                source: 'www.testsource.com',
              }),
              popup_position: 'top left',
            },
          }}
          mode="view"
        />
      </Provider>,
    );
    expect(container.querySelector('#label_ref-1')).toBeInTheDocument();
  });
});
