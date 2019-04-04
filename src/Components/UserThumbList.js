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
    const { thumbs } = this.props;
    const { expanded } = this.state;

    // expand button
    const expandThumb = { more: thumbs.length - 9 };
    // thumbnail list
    const thumbList =
      thumbs.length > 9 && !expanded ? thumbs.slice(0, 9) : thumbs;

    const showToggle = !expanded && thumbs.length > 9;

    return (
      <ul>
        {thumbList.map(item => (
          <UserThumb key={item.id} {...item} />
        ))}
        {showToggle && (
          <UserThumbToggle {...expandThumb} onClick={this.handleExpand} />
        )}
      </ul>
    );
  }
}
