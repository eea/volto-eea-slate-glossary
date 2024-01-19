import { Popup } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { GLOSSARYSVG } from './constants';
import './style.less';

export const GlossaryPopupValue = (props) => {
  const { glossaryTerm } = props;

  const glossaryTermJSON = glossaryTerm ? JSON.parse(glossaryTerm) : '';
  const glossaryTermSource = glossaryTermJSON['sources'] || [];

  return glossaryTermJSON ? (
    <div className="glossary-popup">
      <div>
        <b>{glossaryTermJSON['term']}</b>
      </div>
      <div>{glossaryTermJSON['definition']}</div>
      {glossaryTermSource ? (
        <div>
          <span>
            <b>Sources: </b>
          </span>
          <ul>
            {glossaryTermSource.map((source) => {
              const displayTitle = source['organisation']
                ? source['title'] + ', ' + source['organisation']
                : source['title'];

              return (
                <li>
                  {source['link'] ? (
                    <UniversalLink
                      href={source['link']}
                      openLinkInNewTab={true}
                    >
                      {displayTitle}
                    </UniversalLink>
                  ) : (
                    displayTitle
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div className="glossary-popup">
      <i>No term selected </i>
    </div>
  );
};

export const GlossaryElement = (props) => {
  const { attributes, children, element, mode } = props;
  const { data = {} } = element;
  const { uid, popup_position } = data;

  const glossaryTerm = data?.glossary_term || '';
  // const glossaryTermJSON = glossaryTerm ? JSON.parse(glossaryTerm) : '';
  // const glossaryTermSource = glossaryTermJSON['sources'] || {};

  return (
    <>
      {mode === 'view' ? (
        <span id={`ref-${uid}`} aria-describedby="slate-label">
          <Popup
            position={popup_position}
            on="click"
            trigger={
              <span
                id={`label_ref-${uid}`}
                {...attributes}
                className={cx(popup_position, 'slate-popup-item glossary-item')}
              >
                {children}
                <Icon
                  name={GLOSSARYSVG}
                  size="14px"
                  className="glossary-icon"
                />
              </span>
            }
            className={popup_position}
          >
            <GlossaryPopupValue
              glossaryTerm={glossaryTerm ? glossaryTerm : ''}
              // glossaryTerm={glossaryTerm ? glossaryTerm[0] : ''}
            />
          </Popup>
        </span>
      ) : (
        <span
          id={`label_ref-${uid}`}
          {...attributes}
          className="slate-popup-item glossary-item"
        >
          {children}
        </span>
      )}
    </>
  );
};
