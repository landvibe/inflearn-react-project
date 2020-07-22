import React from 'react';
import { Space, Spin } from 'antd';
import useFetchInfo from '../../common/hook/useFetchInfo';

/**
 *
 * @param {object} param
 * @param {string} param.label
 * @param {string} param.actionType
 * @param {string=} param.fetchKey
 */
export default function FetchLabel({ label, actionType, fetchKey }) {
  const { isSlow } = useFetchInfo(actionType, fetchKey);
  return (
    <Space>
      {label}
      {isSlow && <Spin size="small" />}
    </Space>
  );
}
