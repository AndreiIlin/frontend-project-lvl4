import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  changeChannel,
  selectors,
} from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

const NotRemovableChannel = ({
  data:
    {
      channel,
      currentChannelId,
    },
}) => {
  const dispatch = useDispatch();
  return (
    <Nav.Item as="li" className="w-100">
      <Button
        variant={channel.id === currentChannelId ? 'secondary' : 'none'}
        type="button"
        className="w-100 rounded-0 text-start"
        onClick={() => dispatch(changeChannel(channel.id))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </Nav.Item>
  );
};
const RemovableChannel = ({
  data:
    {
      channel,
      currentChannelId,
    },
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={channel.id === currentChannelId ? 'secondary' : 'none'}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => dispatch(changeChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle
          variant={channel.id === currentChannelId ? 'secondary' : 'none'}
          className="flex-grow-0"
          aria-expanded="false"
        >
          <span className="visually-hidden">{t('control')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(openModal({
              type: 'removing',
              item: channel,
            }))}
          >
            {t('remove')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(openModal({
              type: 'renaming',
              item: channel,
            }))}
          >
            {t('rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};
const Channels = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  return (
    <Col xs={4} md={2} className="border-end pt-4 px-0 bg-light">
      <div
        className="d-flex flex-wrap justify-content-between align-items-center mb-2 ps-2 ps-xxl-4 ps-xl-3 pb-3 pe-2 border-bottom border-2"
      >
        <span>{t('channels')}</span>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() => dispatch(openModal({
            type: 'adding',
            item: null,
          }))}
        >
          +
        </Button>
      </div>
      <Nav as="ul" fill variant="pills" className="px-2">
        {channels.map((channel) => (
          channel.removable ? (
            <RemovableChannel
              data={{
                channel,
                currentChannelId,
              }}
              key={channel.id}
            />
          ) : (
            <NotRemovableChannel
              data={{
                channel,
                currentChannelId,
              }}
              key={channel.id}
            />
          )
        ))}
      </Nav>
    </Col>
  );
};
export default Channels;
