import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const videos = await loadVideos();
        setVideos(videos);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadVideos() {
    return API.get("videos", "/videos");
  }

  function renderVideosList(videos) {
    return (
      <>
        <LinkContainer to="/videos/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new video</span>
          </ListGroup.Item>
        </LinkContainer>
        {videos.map(({ videoId, content, createdAt }) => (
          <LinkContainer key={videoId} to={`/videos/${videoId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>M2AM</h1>
        <p className="text-muted">Media Assets Management</p>
      </div>
    );
  }

  function renderVideos() {
    return (
      <div className="videos">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Videos</h2>
        <ListGroup>{!isLoading && renderVideosList(videos)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderVideos() : renderLander()}
    </div>
  );
}