import React from 'react';
import { articleURL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

class UpadteArticle extends React.Component {
  state = {
    title: this.props.updateArticle.title || '',
    description: this.props.updateArticle.description || '',
    body: this.props.updateArticle.body || '',
    tagList: this.props.updateArticle.tagList || [],
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, tagList, body } = this.state;
    let slug = this.props.match.params.slug;
    fetch(articleURL + `/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.map((tag) => tag.trim()).join(''),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        this.props.history.push(`/article/${slug}`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { title, description, tagList, body } = this.state;
    return (
      <>
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
              onClick={this.handleSubmit}
              type='submit'
              value='Publish Article'
            />
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(UpadteArticle);
