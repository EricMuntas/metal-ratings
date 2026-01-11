export default function Filter({ genres }) {

console.log(genres);
    return (

        <>
            <div className="w-1/2 h-26 bg-gray-400 border rounded-2xl m-10">
                <span>Search</span>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="" placeholder="Band" />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select name="status" id="">
                        <option value="" disabled>
                            Select status
                        </option>
                        <option value="Active">
                            Active
                        </option>
                        <option value="Split Up">
                            Split Up
                        </option>
                        <option value="On Hold">
                            On Hold
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Genre:</label>
                    <select name="status" id="">
                        <option value="" disabled>Select genre...</option>
                        {
                            genres.map((genre, index) => (
                                <option value={genre.id} key={genre.id}>{genre.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>

    );


}