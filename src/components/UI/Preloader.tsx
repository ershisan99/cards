import preloader from './../../assets/images/preloader.svg'

const Preloader = () => {
    return (
        <>
            <img
                className="mx-auto block w-28"
                src={preloader}
                alt="Preloader"
            />
        </>
    )
}

export default Preloader
