import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
/**
 * 合并相同数据，导出合并列所需的方法(只适合el-table)
 * @param {Object} data
 * @param {Object} rowSpanArray
 */
type MergeType = {
  rowspan: number;
  colspan: number;
};
interface SpanMethodProps<T> {
  row: T;
  column: TableColumnCtx<T>;
  rowIndex: number;
  columnIndex: number;
}
type Func<T> = (params: SpanMethodProps<T>) => MergeType;
export function getRowSpanMethod<T>(
  data: T[] | any[],
  rowSpanArray: string[]
): Func<T> {
  /**
   * 要合并列的数据
   */
  const rowSpanNumObject: any = {};
  //初始化 rowSpanNumObject
  rowSpanArray.map((item) => {
    rowSpanNumObject[item] = new Array(data.length).fill(1, 0, 1).fill(0, 1);
    rowSpanNumObject[`${item}-index`] = 0;
  });
  //计算相关的合并信息
  for (let i: number = 1; i < data.length; i++) {
    rowSpanArray.map((key: string) => {
      const index = rowSpanNumObject[`${key}-index`];
      if (data[i][key] === data[i - 1][key]) {
        rowSpanNumObject[key][index]++;
      } else {
        rowSpanNumObject[`${key}-index`] = i;
        rowSpanNumObject[key][i] = 1;
      }
    });
  }
  //提供合并的方法并导出
  const spanMethod: Func<T> = function ({
    row,
    column,
    rowIndex,
    columnIndex,
  }) {
    if (rowSpanArray.includes(column["property"])) {
      const rowspan = rowSpanNumObject[column["property"]][rowIndex];
      if (rowspan > 0) {
        return { rowspan: rowspan, colspan: 1 };
      }
      return { rowspan: 0, colspan: 0 };
    }
    return { rowspan: 1, colspan: 1 };
  };

  return spanMethod;
}
