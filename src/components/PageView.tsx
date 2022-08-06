import classnames from "classnames";
import ReactPaginate from "react-paginate";
import './PageView.css'
import styles from './PageView.module.css'
type Props = {
    onPageChange : (page:{selected:number}) => void,
    totalPageCount: number,
    currentPage: number
}

const PageView = (props: Props) => {

    return (
        <div className={classnames('issuesPagination', styles.pagination)}>
            <ReactPaginate pageCount={props.totalPageCount}
                           breakLabel={"..."}
                           previousLabel={"이전"}
                           nextLabel={"다음"}
                           pageRangeDisplayed={10}
                           onPageChange={props.onPageChange}
                            forcePage={props.currentPage}
            ></ReactPaginate>
        </div>
    )
};

export default PageView;