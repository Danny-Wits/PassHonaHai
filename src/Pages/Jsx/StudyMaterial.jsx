import NavBar from "../../Components/Jsx/NavBar.jsx";
import {useLocation, useParams} from "react-router-dom";
import {useAuth} from "../../Context.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import API from "../../Scripts/API.js";
import {Times} from "../../Scripts/Const.js";
import {enqueueSnackbar} from "notistack";
import {useEffect, useState} from "react";
import "../Styles/StudyMaterial.css";
import defaultImage from "../../assets/mascot1.png";
import CommentCard from "../../Components/Jsx/CommentCard.jsx";

function StudyMaterial() {
    const id = parseInt(useParams()?.id) ?? 0;
    const {user_info} = useAuth();
    const material_info = useLocation().state;
    const [liked, setLiked] = useState(false);
    const [yourComment, setYourComment] = useState("")
    const queryOptions = {
        enabled: !!id,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        cacheTime: Times.Minute * 10,
        staleTime: Times.Minute * 10,
        keepPreviousData: true
    }

    const {
        data: likesData,
        isFetching: isFetchingLikes
    } = useQuery(["get_material_likes", id], () => API.getStudyMaterialLikes(id), queryOptions);
    const {data: commentData} = useQuery(["get_material_comments", id], () => API.getStudyMaterialComments(id), queryOptions);

    const likes = likesData?.likes ?? [];
    const comments = commentData?.comments ?? [];

    const queryClient = useQueryClient();

    useEffect(() => {
        if (likes.some((like) => like.user_id === user_info?.user_id)) {
            setLiked(true);
        }
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].user_id === user_info?.user_id) {
                setYourComment(comments[i].comment);
                break;
            }
        }

    }, [likes, user_info?.user_id, comments]);

    const {
        mutate: LikeMaterial,
        isLoading: isLiking
    } = useMutation((data) => API.likeMaterial(data.user_id, data.data), {
        onSuccess: (data) => {
            queryClient.refetchQueries(["get_material_likes", id]).then(() => {

            })
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
                return
            }


        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"})
        }
    });
    const {
        mutate: UnlikeMaterial,
        isLoading: isUnliking
    } = useMutation((data) => API.unlikeMaterial(data.user_id, data.data), {
        onSuccess: (data) => {
            queryClient.refetchQueries(["get_material_likes", id]).then(() => {
            })
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
            }

        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"})
        }
    });
    const toggleLike = () => {
        if (liked) {
            UnlikeMaterial({user_id: user_info?.user_id, data: {material_id: id}})
        } else {
            LikeMaterial({user_id: user_info?.user_id, data: {material_id: id}})
        }
        setLiked(prevLiked => !prevLiked);
    };

    const {
        mutate: addComment,
        isLoading: isCommenting
    } = useMutation((data) => API.commentMaterial(data.user_id, data.data), {
        onSuccess: (data) => {
            queryClient.refetchQueries(["get_material_comments", id]).then(() => {
            })
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
            }

        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"})
        }
    });
    const {
        mutate: deleteComment,
        isLoading: isDeletingComment
    } = useMutation((data) => API.deleteComment(data.user_id, data.data), {
        onSuccess: (data) => {
            queryClient.refetchQueries(["get_material_comments", id]).then(() => {
            })
            if (data.error) {
                enqueueSnackbar(data.error, {variant: "error"});
            }

        },
        onError: (error) => {
            enqueueSnackbar(error.message, {variant: "error"})
        }
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        addComment({user_id: user_info?.user_id, data: {material_id: id, comment: yourComment}});
        setYourComment("");
    }
    const handleCommentDelete = () => {
        deleteComment({user_id: user_info?.user_id, data: {material_id: id}});
    }
    const fileData = () => {
        let download_link = material_info?.download_link;
        const extention = download_link.substring(download_link.length - 3, download_link.length)
        const notVisible = ["pdf", "docx", "ppt"]
        if (notVisible.includes(extention)) {
            download_link = defaultImage;
        }
        return download_link;
    }


    return (
        <div className={"page"}>
            <NavBar/>
            <div className={"frame"}>
                <img src={fileData()}></img>
            </div>

            <form className={"login-form"} onSubmit={handleCommentSubmit}>
                <label htmlFor="comment">Comment</label>
                <input type="text" id="comment" name="comment" value={yourComment}
                       onChange={(e) => setYourComment(e.target.value)}></input>
                <button type={"submit"} disabled={isCommenting || isDeletingComment}
                        className={"primary-button"}>Comment
                </button>
                <button type={"button"} onClick={handleCommentDelete} disabled={isCommenting || isDeletingComment}
                        className={"secondary-button"}>Delete Comment
                </button>
            </form>

            {id}

            <code className={"flex"}>
                {
                    JSON.stringify(comments)
                }
                {

                }
            </code>

            <div className={"comment-card-container"}>
                {comments.map((comment, index) => {
                    return (
                        <CommentCard key={index} comment={comment}></CommentCard>
                    )
                })}
            </div>

            <button onClick={toggleLike} disabled={isUnliking || isLiking || isFetchingLikes}
                    className={(!liked) ? "primary-button" : "secondary-button"}
            >
                {
                    !liked ?
                        <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                }
            </button>
        </div>
    )
}

export default StudyMaterial;