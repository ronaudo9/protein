import useSWR from 'swr';
import { useState } from 'react';


export default function Pagination({
  clickHandlerNext,
  clickHandlerPrev,
}: {
  clickHandlerNext: any;
  clickHandlerPrev: any;
}) {


  return (
    <div>
       <button
              type="button"
              onClick={clickHandlerNext}
            >
              +
            </button>
            {/* <p>&nbsp;{count}&nbsp;</p> */}
            <button
              type="button"
              onClick={clickHandlerPrev}
            >
              -
            </button>
    </div>
  );
}
