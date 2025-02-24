import React, { useState } from "react";

function InsertPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("일반"); // 기본 카테고리 설정
    const [message, setMessage] = useState(null);

    function handleSubmit() {
        const newPost = {
            userId: 1, // 실제 사용자 ID 필요 (예제에서는 1로 고정)
            //    postTitle:
            //    postContent:
            thumbnail: null, // 썸네일이 없으므로 기본값 null
            //    postCategory:
            viewCount: 0, // 새 글이므로 조회수 0
            likeCount: 0, // 좋아요 수 0
            postStatus: "공개", // 기본 상태 '공개'
            createdAt: new Date().toISOString(), // 현재 시간
            updatedAt: new Date().toISOString(), // 현재 시간
        };

// 저장하기  기능 완성
    }

    return (
        <div>
            <h2>새 게시물 작성</h2>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {/* 카테고리 선택 */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="일반">일반</option>
                <option value="공지사항">공지사항</option>
                <option value="질문">질문</option>
                <option value="후기">후기</option>
            </select>

            <button onClick={handleSubmit}>등록</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default InsertPost;