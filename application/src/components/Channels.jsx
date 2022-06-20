import React from 'react';
import { Button, ButtonGroup, Col, Dropdown, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel, selectors } from '../slices/channelsSlice.js';

const NotRemovableChannel = ({
  name,
  id,
  current,
}) => {
  const dispatch = useDispatch();

  return (
    <Nav.Item as="li" className="w-100" key={id}>
      <Button
        variant={id === current ? 'secondary' : 'none'}
        type="button"
        className="w-100 rounded-0 text-start"
        onClick={() => dispatch(changeChannel(id))}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </Nav.Item>
  );
};
const RemovableChannel = ({
  name,
  id,
  current,
}) => {
  const dispatch = useDispatch();

  return (
    <Nav.Item as="li" className="w-100" key={id}>
      <Dropdown as={ButtonGroup}>
        <Button
          variant={id === current ? 'secondary' : 'none'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(changeChannel(id))}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
        <Dropdown.Toggle variant={id === current ? 'secondary' : 'none'} className="flex-grow-0" aria-expanded="false" />
        <Dropdown.Menu>
          <Dropdown.Item>Удалить</Dropdown.Item>
          <Dropdown.Item>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};
const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button type="button" className="p-1">Добавить</Button>
      </div>
      <Nav as="ul" fill variant="pills" className="px-2">
        {channels.map(({
          id,
          name,
          removable,
        }) => (
          removable ? <RemovableChannel id={id} name={name} key={id} current={currentChannelId} /> :
            <NotRemovableChannel id={id} name={name} key={id} current={currentChannelId} />
        ))}
      </Nav>
    </Col>
  );
};
export default Channels;
