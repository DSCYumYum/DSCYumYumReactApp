import CategorySelect from "../search/CategorySelect";

function Header({ searchKeyword, setSearchKeyword }) {
  return (
    <div>
      {/* <h1 style={{ justify: "center" }}>yum-yum</h1> */}
      <CategorySelect
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    </div>
  );
}

export default Header;
