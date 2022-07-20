import React from 'react';
import { articleURL } from '../utils/constant';

class AddComment extends React.Component {
  state = {
    body: '',
  };

  handleComment = (event) => {
    event.preventDefault();
    const { body } = this.state;
    let slug = this.props.match.params.slug;
    fetch(articleURL + `/${slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('can not create Comment');
        }
        return res.json();
      })
      .then(({ article }) => {
        this.props.history.push(`articles/${slug}`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <>
        <p>{this.state.body}</p>
      </>
    );
  }
}

export default AddComment;
