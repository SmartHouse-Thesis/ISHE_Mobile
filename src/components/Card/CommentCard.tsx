import Avatar from "antd/es/avatar/avatar";
import React from "react";
import './CommentCard.css'

interface Props {
    item: any
}

const CommentCard: React.FC<Props> = ({item}) => {
    return <>
        <div className="comment__item">
            <div className="comment__header">
                <Avatar src={item.avatar} />
                <h5>{item.name}</h5>
            </div>
            <div className="comment__content">{item.content}</div>
        </div>
    </>
}

export default CommentCard