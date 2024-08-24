import Link from "next/link";
import React from "react";

type PaginatorBarProps = {
  keywords: string;
  classification: string;
  location: string;

  currentPage: number;
  totalPages: number;
};

export default function PaginationBar({
  keywords,
  classification,
  location,
  currentPage,
  totalPages,
}: PaginatorBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 4, totalPages - 9));
  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`/listings?${
          keywords != undefined ? `&keywords=${keywords}` : ""
        }${
          classification != undefined ? `&classification=${classification}` : ""
        }${location != undefined ? `&location=${location}` : ""}${
          page && "&page=" + page
        }`}
        key={page}
        scroll={false}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>
    );
  }
  return <div className="join">{numberedPageItems}</div>;
}
