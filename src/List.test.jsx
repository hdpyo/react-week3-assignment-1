import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';


describe('<List />', () => {
  const handleClickDeleteButton = jest.fn();
  const tasks = [
    {
      id: 1,
      title: '뭐라도 하기',
    },
    {
      id: 2,
      title: '아무것도 하지 않기',
    },
    {
      id: 3,
      title: '코드숨 과제하기',
    },
  ];

  context('empty list', () => {
    it('display empty list', () => {
      const { container } = render((
        <List
          tasks={[]}
          onClickDelete={null}
        />
      ));
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('fully list', () => {
    it('display list', () => {
      const { container, getAllByRole } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDeleteButton}
        />
      ));

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });

      const confirmButtons = getAllByRole('button');
      expect(handleClickDeleteButton).not.toBeCalled();
      confirmButtons.forEach((button) => fireEvent.click(button));
      expect(handleClickDeleteButton).toBeCalledTimes(tasks.length);
    });
  });

  context('click event each list items', () => {
  });
});
