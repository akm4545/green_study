import styles from '../css/CSSModule.module.css'

const CSSModule = () => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.wrapper} ${styles.inverted}`}>
                안녕하세요, 저는 <span className='something'>CSS Module</span>
            </div>
        </div>
    )
}

export default CSSModule;