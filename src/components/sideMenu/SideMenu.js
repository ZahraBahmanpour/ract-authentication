import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openTab, setCrudMode } from "../../redux/features/tab/tabsSlice";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/features/post/postSlice";
import { CRUD_MODE_CREATE } from "../../config/constants";

function SideMenu() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const handleCreateNew = () => {
    const id = Math.floor(Math.random() * 10000);
    const title = prompt("Enter file name", "Untitled");
    dispatch(setCrudMode({ crudMode: CRUD_MODE_CREATE }));
    dispatch(openTab({ id, title, body: "", tempBody: "" }));
  };
  return (
    <ListGroup>
      <ListGroup.Item onClick={handleCreateNew}>
        <Link to="#">Create File</Link>
      </ListGroup.Item>
      {posts.map((item) => (
        <ListGroup.Item
          key={item.id}
          onClick={() => dispatch(openTab({ ...item, tempBody: item.body }))}
        >
          <Link to={`/${item.id}`}>{item.title.slice(0, 15)}...</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default SideMenu;
