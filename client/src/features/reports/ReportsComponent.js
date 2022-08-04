import styles from './reports.module.css'
import styleUtilities from '../../utility.module.css';

const ReportsComponent = () => {
    return (
        <section className={`${styleUtilities.Section} ${styles.Section}`}>
            <h2>Reports</h2>
            <div>Reports ReportsComponent</div>
        </section>
    )
}

export default ReportsComponent