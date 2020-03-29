import React, {useState, useEffect} from 'react';
import sanityClient from 'part:@sanity/base/client';
import {IntentLink} from 'part:@sanity/base/router';
import {withDocument} from 'part:@sanity/form-builder';

const ItemViewer = ({document}) => {
  const {_id} = document;
  const [items, setItems] = useState(null);

  useEffect(() => {
    /*Const query = `
    *[references("${_id}")] {
      title,
      "id": _id,
      preachedDate,
      preacher ->{name}
    }`;
    sanityClient.fetch(query).then(response => {
      setItems(response);
    }); */
    const subscription = sanityClient.observable
      .fetch(
        `*[references("${_id}")] {
        title,
        "id": _id,
        preachedDate,
        speaker ->{name}
      }|order(preachedDate desc)`
      )
      .subscribe({
        next: res => setItems(res),
        error: error => console.log('error', error),
        complete: () => console.log('Completed fetch')
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [document]);

  return (
    <div>
      <h2>Members of this series</h2>
      <ul>
        {items?.map(item => (
          <li key={item.id}>
            <IntentLink intent="edit" params={{type: 'sermon', id: item.id}}>
              {item?.title} - {item?.speaker?.name}
              <br />
              <small>{item?.preachedDate}</small>
            </IntentLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withDocument(ItemViewer);
