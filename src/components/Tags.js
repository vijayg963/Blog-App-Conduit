import React from 'react';
import { tagsURL } from '../utils/constant';
import Loader from './Loader';

class Tags extends React.Component {
  state = {
    tags: [],
    error: '',
  };
  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({ tags });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch tags' });
      });
  }
  render() {
    const { tags, error } = this.state;
    if (!tags.length) {
      return <Loader />;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return (
      <aside>
        {tags.map((tag) => (
          <span
            key={tag}
            onClick={() => this.props.addTab(tag)}
            className={tag ? 'tag' : 'hidden'}
          >
            {tag}
          </span>
        ))}
      </aside>
    );
  }
}

export default Tags;
