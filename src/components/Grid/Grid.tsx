import React, { useRef, useCallback } from "react";
import { useGetFinancialInstruments } from "../../hooks/useGetFinancialInstruments";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "./Grid.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { AssetClass } from "../../utilities/types-and-enums";
import { Error } from "../Error/Error";
import {
  assetClassComparator,
  stylePositiveAndNegativeValues,
} from "./GridHelpers";

export const Grid = () => {
  const { data, isRefetching, error, isError } = useGetFinancialInstruments();
  const client = useQueryClient();

  const gridRef = useRef<AgGridReact | null>(null);

  const refreshData = () => {
    client.invalidateQueries({ queryKey: ["grid-data"] });
  };

  /* 
I am interpreting sort index preference based on requirements doc - 
  Sorting
    by “Asset Class”: Commodities first, then Equities and Credit last.
    by “Price” in descending order
    by “Ticker” in alphabetical order

However visually it would make most sense to have Asset Class, Ticker, then Price as there is a low Likelihood that prices will be identical and therefore sorting Ticker after Price makes little sense - to discuss in interview
*/

  const colDefs: ColDef[] = [
    {
      headerName: "Asset Class",
      field: "assetClass",
      comparator: (valueA: AssetClass, valueB: AssetClass) =>
        assetClassComparator(valueA, valueB),
      sortIndex: 1,
    },
    {
      headerName: "Ticker",
      field: "ticker",
      sortIndex: 3,
    },

    {
      headerName: "Price",
      field: "price",
      type: "numericColumn",

      cellStyle: (params) => {
        return stylePositiveAndNegativeValues(params.value);
      },
      sortIndex: 2,
    },
  ];

  const onGridReady = useCallback(() => {
    gridRef.current!.api.applyColumnState({
      state: [
        { colId: "assetClass", sort: "asc" },
        { colId: "price", sort: "desc" },
        { colId: "ticker", sort: "asc" },
      ],
      defaultState: { sort: null },
    });
  }, []);

  const getRowStyle = (params: any) => {
    if (params.data.assetClass === AssetClass.COMMODITIES) {
      //white
      return { background: "#ffffff" };
    }
    if (params.data.assetClass === AssetClass.EQUITIES) {
      //blue shade
      return { background: "#c6e0fe" };
    }
    if (params.data.assetClass === AssetClass.CREDIT) {
      // green shade
      return { background: "#b0e8b0" };
    }
  };

  const defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  React.useEffect(() => {
    isRefetching
      ? gridRef.current?.api?.showLoadingOverlay()
      : gridRef.current?.api?.hideOverlay();
  }, [isRefetching, gridRef.current]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.buttonRow}>
        <button
          onClick={refreshData}
          className={styles.refreshButton}
          disabled={isRefetching}
        >
          Refresh Data
        </button>
      </div>
      {!isError && (
        <div
          className="ag-theme-quartz"
          style={{ width: "100%", height: "100%" }}
          data-testid="grid-wrapper"
        >
          <AgGridReact
            ref={gridRef}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowData={data}
            columnDefs={colDefs}
            paginationAutoPageSize={true}
            pagination={true}
            getRowStyle={getRowStyle}
            loadingOverlayComponent={LoadingData}
          />
        </div>
      )}

      {isError && <Error message={error.message} />}
    </div>
  );
};

const LoadingData = () => {
  return (
    <div className={styles.loadingWrapper} data-testid="loading">
      <div className={styles.loader}></div> Loading Financial Instruments
    </div>
  );
};
