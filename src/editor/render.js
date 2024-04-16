import { useEffect, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { GLOSSARYSVG } from './constants';
import './style.less';

const DEFINITION_LIMIT = 1000;

export const GlossaryPopupValue = (props) => {
  const { glossaryTerm } = props;

  const glossaryTermJSON = glossaryTerm ? JSON.parse(glossaryTerm) : '';
  const isLongDefinition =
    glossaryTermJSON &&
    glossaryTermJSON['definition'].length > DEFINITION_LIMIT;
  const glossaryTermSource = glossaryTermJSON['sources'] || [];
  const [showFullDefinition, setShowFullDefinition] = useState(false);

  return glossaryTermJSON ? (
    <div>
      <div>
        <b>{glossaryTermJSON['term']}</b>
      </div>
      {!isLongDefinition ? (
        <p>{glossaryTermJSON['definition']}</p>
      ) : (
        <p>
          {showFullDefinition
            ? glossaryTermJSON['definition']
            : glossaryTermJSON['definition'].substring(0, DEFINITION_LIMIT) +
              '...'}
          <button
            className="ui basic icon button small show-more"
            onClick={(e) => {
              setShowFullDefinition(!showFullDefinition);
            }}
          >
            {showFullDefinition ? 'Show less' : 'Show more'}
          </button>
        </p>
      )}

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
    <div>
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
            className="glossary-popup"
            position={popup_position}
            offset={[0, 0]}
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
