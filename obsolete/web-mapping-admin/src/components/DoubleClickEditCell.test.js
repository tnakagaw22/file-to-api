import React from "react";
import renderer from "react-test-renderer";
// import { mount } from 'enzyme'

import DoubleClickEditCell from "./DoubleClickEditCell";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Table, Input, Icon } from "semantic-ui-react";

Enzyme.configure({ adapter: new Adapter() });

test("DoubleClickEditCell snapshot", () => {
  const component = renderer
    .create(<DoubleClickEditCell value="test1"></DoubleClickEditCell>)
    .toJSON();
  expect(component).toMatchSnapshot();
});

// test("DoubleClickEditCell onChange", () => {
//   const onSave = jest.fn();
//   const props = {
//     value: "cell value",
//     onSave,
//   };
//   const DateComponent = mount(<DoubleClickEditCell {...props} />);
//   const dateInput = DateComponent.find("input");
//   dateInput.simulate("doubleClick");
//   expect(onSave).toHaveBeenCalled;
// });

describe('DoubleClickEditCell', () => {
  it('should show passed value', () => {
    const props = {
      value: "cell value",
    };
   const wrapper = shallow(<DoubleClickEditCell {...props} />);
   const cell = wrapper.find(Table.Cell);

   expect(cell.render().text()).toBe(props.value);

  });

  it('onDoubleClick should show input element', () => {
    const props = {
      value: "cell value",
    };
   const wrapper = mount(<DoubleClickEditCell {...props} />);
   const cell = wrapper.find(Table.Cell);
   cell.simulate('doubleClick');

   expect(wrapper.find(Input).exists()).toBe(true)

  });

  // it('onChange should show changed icon', () => {
  //   const props = {
  //     value: "cell value",
  //   };
  //  const wrapper = mount(<DoubleClickEditCell {...props} />);
  //  const cell = wrapper.find(Table.Cell);
  //  cell.simulate('doubleClick');

  //  const input = wrapper.find(Input);
  //  input.simulate('change', { target: {value: 'new cell value'}});
  //  cell.simulate('blur');
  //  console.log(wrapper.debug());

  //  expect(wrapper.find(Icon).exists()).toBe(true)

  // });
})

// it('onChange should update isChagned true', () => {
