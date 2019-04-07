// list of thumbnails, with click to reveal more
import React from "react";

// components
import UserThumb from "./UserThumb";
import UserThumbToggle from "./UserThumbToggle";

// show first 10, then a button to reveal more
export default class UserThumbList extends React.Component {
  state = {
    expanded: false
  };
  handleExpand = () => {
    this.setState({ expanded: true });
  };
  render() {
    const { thumbs, type } = this.props;
    const { expanded } = this.state;

    // thumbs parsed differently for the following (remove a layer of nesting):
    // - mentionable users (collaborators), key = node
    // - forks, key = owner
    const keys = {
      collaborators: "node",
      forks: "owner"
    };
    const users = type ? Object.keys(thumbs).map((v, i) => Object.assign({}, thumbs[i][keys[type]])) : thumbs;

    // expand button
    const expandThumb = { more: users.length - 9 };
    // thumbnail list
    const thumbList = users.length > 9 && !expanded ? users.slice(0, 9) : users;
    // display toggle button or not
    const showToggle = !expanded && users.length > 9;

    return (
      <ul>
        {thumbList.map(item => (
          <UserThumb key={item.id} {...item} />
        ))}
        {showToggle && <UserThumbToggle {...expandThumb} onClick={this.handleExpand} />}
      </ul>
    );
  }
}
