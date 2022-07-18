import React from 'react';

function ProfileBanner(props) {
  return (
    <section>
      <span>{props.email}</span>
      <p>{props.username}</p>
    </section>
  );
}

export default ProfileBanner;
