export default function Page() {
    return (
        <section className="flex flex-col items-center">
            <h1>Update Details</h1>
            <form action="" method="post" className="flex flex-col">
                <input type="text" placeholder=" Full Name" />
                <input type="checkbox" name="civilian" id="" />
                <label htmlFor="checkbox">civilian</label>
                <input type="date" name="" id="" />
                <input type="text" placeholder="Country" />
                <input type="text" name="" id="" placeholder="Mobile Number" />
            </form>
        </section>
    )
}