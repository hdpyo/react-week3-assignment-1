import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  it('displays default when value are undefined', () => {
    const taskTitle = undefined;
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    // screen.debug();
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
    expect(screen.queryByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('display value ', () => {
    const taskTitle = 'TDD 익숙해지기';
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );
    // screen.debug();
    // screen.getByRole('');
    const input = screen.getByRole('textbox');
    expect(input).toBeEmptyDOMElement();
    expect(input.value).toEqual(taskTitle);
  });

  it('is clicked with handleChangeTitle ', async () => {
    const taskTitle = '';
    const typing = '!';
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, typing);
    expect(handleChangeTitle).toBeCalled();
    expect(handleChangeTitle).toBeCalledWith(typing);
    // onChange시 입력된 typing 값으로 불리어 졌는지 체크 하고 싶은데. 객체가 출력됨
  });

  it('is clicked with handleClickAddTask', async () => {
    const taskTitle = '할일 추가 하기';
    render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    expect(handleClickAddTask).not.toBeCalled();
    await userEvent.click(screen.getByText('추가'));
    expect(handleClickAddTask).toBeCalled();
  });
});
