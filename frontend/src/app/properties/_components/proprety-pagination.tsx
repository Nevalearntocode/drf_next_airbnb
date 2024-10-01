"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginatedResults } from "@/types/general";

import React, { useState } from "react";

type Props = {
  pagination: PaginatedResults;
};

export default function PropertyPagination({ pagination }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { count } = pagination;
  const pagesAmount = Math.ceil(count / 12);

  const updateUrlPage = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(newPage));
    window.history.replaceState({}, "", url.toString());
  };

  const onPrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => {
      const newPage = prev - 1;
      updateUrlPage(newPage);
      return newPage;
    });
  };

  const onNext = () => {
    if (currentPage === pagesAmount) return;
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      updateUrlPage(newPage);
      return newPage;
    });
  };

  return (
    <Pagination className={cn("", pagesAmount === 1 && "hidden")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrevious} className="cursor-pointer" />
        </PaginationItem>
        {[...Array(pagesAmount)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`/?page=${index + 1}`}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={onNext} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
