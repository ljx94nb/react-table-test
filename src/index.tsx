/*** src/index.js ***/
import React, { useState, useEffect, useRef } from 'react';
import { requestData } from './request';
import { BaseTable, makeBuildTreeTransform, ArtColumn, makeTreeModeTransform, applyTransforms } from 'ali-react-table';

function ReactDemo() {
  const columns: ArtColumn[] = [
    {
      code: 'name',
      name: '数据维度',
      lock: true,
      width: 200
      // 通过自定义 getValue，可以实现「根据节点深度选取合适的数据字段」
      // getValue(record: any) {
      //   const meta = record[treeMetaSymbol]
      //   const array = [record.subsidiary_name, record.city_name, record.shop_name]
      //   return array[meta.depth]
      // },
    },
    { code: 'shop_name', name: '门店' },
    // { code: 'imp_uv_dau_pct', name: '曝光UV占DAU比例', render: ratio, align: 'right' },
    { code: 'app_qty_pbt', name: 'APP件单价', align: 'right' },
    { code: 'all_app_trd_amt_1d', name: 'APP成交金额汇总', align: 'right' }
  ];

  const [state, setState] = useState({ isLoading: true, data: [] as any[] });

  useEffect(() => {
    requestData({ url: 'data' }).then(data => {
      console.log(data);
      setState({ isLoading: false, data });
    });
  }, []);

  const [openKeys, onChangeOpenKeys] = useState(['B2C']);

  // 注意 renderData 要用起来
  const renderData = applyTransforms(
    { columns: columns, dataSource: state.data },

    // 从平铺的数据中，根据 id/parent_id 字段构建出树状结构
    makeBuildTreeTransform('id', 'parent_id'),

    makeTreeModeTransform({ primaryKey: 'id', openKeys, onChangeOpenKeys })
  );

  return <BaseTable dataSource={renderData.dataSource} columns={renderData.columns} isLoading={state.isLoading} />;
}

export default ReactDemo;
