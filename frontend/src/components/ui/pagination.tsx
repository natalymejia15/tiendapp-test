import { Button } from "./button";

interface PaginationProps {
    page:number;
    totalPages:number;
    onPageChange:(page:number)=>void;
}

export function TablePagination({
    page,
    totalPages,
    onPageChange,
}:PaginationProps){

    return(
        <div className="flex items-center justify-end gap-2 border-t p-4">

            <Button
                variant="outline"
                disabled={page===1}
                onClick={()=>onPageChange(page-1)}
            >
                Previous
            </Button>

            <span>
                {page} / {totalPages}
            </span>

            <Button
                variant="outline"
                disabled={page===totalPages}
                onClick={()=>onPageChange(page+1)}
            >
                Next
            </Button>

        </div>
    )
}