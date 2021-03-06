import React from "react";
import { shallow } from "enzyme";
import preload from "../../data.json";
import Search from "../Search";
import ShowCard from "../ShowCard";

describe("Search", () => {
  it("should render correctly", () => {
    const component = shallow(<Search shows={preload.shows} />);
    expect(component).toMatchSnapshot();
  });

  it("should render correct amount of shows", () => {
    const component = shallow(<Search shows={preload.shows} />);
    expect(component.find(ShowCard).length).toEqual(preload.shows.length);
  });

  it("should render the correct amount of shows based on search term", () => {
    const searchWord = "black";
    const component = shallow(<Search shows={preload.shows} />);
    component
      .find("input")
      .simulate("change", { target: { value: searchWord } });
    const showCount = preload.shows.filter(
      show =>
        `${show.title} ${show.description}`
          .toUpperCase()
          .indexOf(searchWord.toUpperCase()) >= 0
    ).length;
    expect(component.find(ShowCard).length).toEqual(showCount);
  });
});
