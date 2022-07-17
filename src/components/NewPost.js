import React from 'react';
import { withRouter } from 'react-router-dom';
import { articleURL } from '../utils/constant';

class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, tagList, body } = this.state;
    fetch(articleURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json ',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not Create new article!');
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article + 'hello');
        this.setState({
          title: '',
          description: '',
          body: '',
          tagList: '',
        });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { errors, title, description, tagList, body } = this.state;
    return (
      <div className='formcontrol'>
        <form className='new-post'>
          <input
            onChange={this.handleChange}
            value={title}
            name='title'
            type='text'
            placeholder='Article title'
          />
          <input
            onChange={this.handleChange}
            value={description}
            name='description'
            type='text'
            placeholder='About this Article'
          />
          <textarea
            onChange={this.handleChange}
            value={body}
            name='body'
            rows='10'
            placeholder='Write your article (in markdown)'
          ></textarea>
          <input
            onChange={this.handleChange}
            value={tagList}
            name='tagList'
            type='text'
            placeholder='Enter Tags'
          />
          <input
            onChange={this.handleSubmit}
            type='submit'
            value='Publish Article'
          />
        </form>
      </div>
    );
  }
}

export default withRouter(NewPost);
