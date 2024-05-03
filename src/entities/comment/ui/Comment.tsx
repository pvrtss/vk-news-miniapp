import { Icon16Dropdown, Icon16DropdownFlipped } from "@vkontakte/icons";
import { RichCell } from "@vkontakte/vkui";
import { FC, useCallback, useEffect, useState } from "react";
import { CommentProps } from "../../../typings";
import { getItemById } from "../../news";
import styles from "./Comment.module.css";
import { add } from "../../../features/itemsList/ItemsListSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/typedStoreHooks";

export const Comment: FC<CommentProps> = ({ id }) => {
  const newsList = useAppSelector((state) => state.newsList.list);
  const dispatch = useAppDispatch();
  const comment = newsList[id];
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!newsList[id]) {
      getItemById(id).then((item) => dispatch(add(item)));
    }
  }, [dispatch, newsList, id]);

  const toggleExpand = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return comment && !comment.deleted ? (
    <div>
      <div
        className={comment.kids ? styles.commentWithKids : styles.comment}
        onClick={comment.kids ? toggleExpand : undefined}
      >
        <RichCell
          text={
            <p
              className="text"
              dangerouslySetInnerHTML={{
                __html: comment.text ? comment.text : "",
              }}
            />
          }
          caption={new Date(comment.time * 1000).toLocaleDateString("ru-RU")}
          after={
            comment.kids && (
              <RichCell.Icon aria-hidden>
                {open ? <Icon16DropdownFlipped /> : <Icon16Dropdown />}
              </RichCell.Icon>
            )
          }
        >
          {comment.by}
        </RichCell>
      </div>
      {comment.kids && open && (
        <div className={styles.kids}>
          {comment.kids.map((kid) => (
            <Comment id={kid} key={kid} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <>
      <RichCell
        text={
          <div style={{ width: 200, height: 36 }} className={styles.skeleton} />
        }
        caption={
          <div style={{ width: 60, height: 18 }} className={styles.skeleton} />
        }
      >
        <div style={{ width: 120, height: 18 }} className={styles.skeleton} />
      </RichCell>
    </>
  );
};
