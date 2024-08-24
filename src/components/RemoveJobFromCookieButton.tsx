import React from 'react'
import { remove } from './actions'

type RemoveJobFromCookieButtonProps = {
    data: string;
  };
  
  export default function RemoveJobFromCookieButton({
    data,
  }: RemoveJobFromCookieButtonProps) {
    return (
      <button onClick={() => remove(data)} className="btn btn-warning ">
        Remove job
      </button>
    );
  }
  