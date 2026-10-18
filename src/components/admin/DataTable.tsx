import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  itemsPerPage?: number;
  onReorder?: (data: T[]) => void;
  isDraggable?: boolean;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Search...",
  searchKey,
  itemsPerPage = 10,
  onReorder,
  isDraggable = false,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = searchKey
    ? data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(searchQuery.toLowerCase())
    )
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const [localData, setLocalData] = useState<T[]>(paginatedData);

  useEffect(() => {
    setLocalData(paginatedData);
  }, [data, currentPage, searchQuery]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorder) return;

    const items = Array.from(localData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocalData(items);

    // Calculate full reordered list
    const newData = [...data];
    const dropStartIndex = startIndex;
    newData.splice(dropStartIndex, localData.length, ...items);
    onReorder(newData);
  };

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {isDraggable && <TableHead className="w-[40px]"></TableHead>}
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="table-body">
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {localData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + (isDraggable ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                        No data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    localData.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={String(item.id)}
                        index={index}
                        isDragDisabled={!isDraggable}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={snapshot.isDragging ? "bg-muted shadow-lg ring-1 ring-primary/10" : ""}
                          >
                            {isDraggable && (
                              <TableCell className="w-[40px]" {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                              </TableCell>
                            )}
                            {columns.map((column) => (
                              <TableCell key={column.key}>
                                {column.render
                                  ? column.render(item)
                                  : String((item as Record<string, unknown>)[column.key] ?? "")}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
