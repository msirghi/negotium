import { mount } from 'enzyme';
import { PageTitle } from './PageTitle';
import { UpperHeader } from './upperHeader/UpperHeader';
import { EditableTitle } from './editableTitle/EditableTitle';

describe('PageTitle', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    title: 'Title',
    editableOptions: { onSave: jest.fn(), title: 'title' },
    showUpperHeader: false,
    upperHeaderTitle: 'Inbox',
  };

  it('should render UpperHeader if editableOptions & showUpperHeader props are provided', () => {
    const wrapper = mount(<PageTitle {...defaultProps} showUpperHeader />);
    expect(wrapper.find(UpperHeader)).toHaveLength(1);
  });

  it('should not render UpperHeader if upperHeaderTitle & showUpperHeader = false props are provided', () => {
    const wrapper = mount(<PageTitle {...defaultProps} />);
    expect(wrapper.find(UpperHeader)).toHaveLength(0);
  });

  it('should not render UpperHeader if upperHeaderTitle is undefined & showUpperHeader = true', () => {
    const wrapper = mount(
      <PageTitle
        {...defaultProps}
        upperHeaderTitle={undefined}
        showUpperHeader
      />
    );
    expect(wrapper.find(UpperHeader)).toHaveLength(0);
  });

  it('should render editable title', () => {
    const wrapper = mount(<PageTitle {...defaultProps} />);
    expect(wrapper.find(EditableTitle)).toHaveLength(1);
  });

  it('should not render editable title if editableOptions prop is undefined', () => {
    const wrapper = mount(
      <PageTitle {...defaultProps} editableOptions={undefined} />
    );
    expect(wrapper.find(EditableTitle)).toHaveLength(0);
  });
});
