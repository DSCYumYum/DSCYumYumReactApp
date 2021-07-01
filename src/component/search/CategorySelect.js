import React, { useEffect, useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import PropTypes from "prop-types";
import CategoryCard from "./CategoryCard";
import { List, ListItem } from "@material-ui/core";
import searchByCategory from "./functions/searchByCategory";

let list = [
  { name: "item1" },
  { name: "item2" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
  { name: "item7" },
  { name: "item8" },
  { name: "item9" },
  { name: "item10" },
  { name: "item11" },
  { name: "item12" },
  { name: "item13" },
  { name: "item14" },
  { name: "item15" },
  { name: "item16" },
  { name: "item17" },
  { name: "item18" },
  { name: "item19" },
  { name: "item20" },
  { name: "item21" },
  { name: "item22" },
  { name: "item23" },
  { name: "item24" },
  { name: "item25" },
];
const MenuItem = ({ text, selected }) => {
  return (
    <div className={`menu-item ${selected ? "active" : ""}`}>
      <CategoryCard item={text} selected={selected} />
    </div>
  );
};

export const Menu = (list, selected) =>
  list.map((el) => {
    const { name } = el;
    return <MenuItem text={name} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class CategorySelect extends React.Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: list.length,
    scrollToSelected: false,
    selected: "item1",
    translate: 0,
    transition: 0.3,
    wheel: true,
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
  }

  onFirstItemVisible = () => {
    console.log("first item is visible");
  };

  onLastItemVisible = () => {
    console.log("last item is visible");

    const newItems = Array(5)
      .fill(1)
      .map((el, ind) => ({ name: `item${list.length + ind + 1}` }));
    list = list.concat(newItems);
    this.menuItems = Menu(list, list.slice(-1)[0].name);
    this.setState({
      itemsCount: list.length,
      selected: this.state.selected,
    });
  };

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = (key) => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = (ev) => {
    const { itemsCount = list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= list.length && val >= 0
        ? +ev.target.value
        : list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew,
      });
    }
  };

  setSelected = (ev) => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };
  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      itemsCount,
      scrollToSelected,
      selected,
      translate,
      transition,
      wheel,
    } = this.state;

    const menu = this.menuItems;
    const flexContainer = {
      display: "flex",
      flexDirection: "row",
      padding: 0,
    };
    return (
      <div>
        <List style={flexContainer}>
          <button
            onClick={() => {
              this.props.setSearchKeyword("디저트");
              console.log("디저트");
              searchByCategory("디저트");
            }}
          >
            디저트
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("분식");
              console.log("분식");
              searchByCategory("분식");
            }}
          >
            분식
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("패스트푸드");
              console.log("패스트푸드");
              searchByCategory("패스트푸드");
            }}
          >
            패스트푸드
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("한식");
              console.log("한식");
              searchByCategory("한식");
            }}
          >
            한식
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("치킨");
              console.log("치킨");
              searchByCategory("치킨");
            }}
          >
            치킨
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("일식");
              console.log("일식");
              searchByCategory("일식");
            }}
          >
            일식
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("피자");
              console.log("피자");
              searchByCategory("피자");
            }}
          >
            피자
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("족발");
              console.log("족발");
              searchByCategory("족발");
            }}
          >
            족발,보쌈
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("양식");
              console.log("양식");
              searchByCategory("양식");
            }}
          >
            아시안,양식
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("중국집");
              console.log("중국집");
              searchByCategory("중국집");
            }}
          >
            중국집
          </button>
          <button
            onClick={() => {
              this.props.setSearchKeyword("찜");
              console.log("찜");
              searchByCategory("찜");
            }}
          >
            찜,탕
          </button>
        </List>
      </div>
    );
  }
}

export default CategorySelect;
