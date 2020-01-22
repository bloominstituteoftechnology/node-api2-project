import React from "react";

import { Card, CardText, CardTitle } from "reactstrap";

export default function PostCard(props) {
  const { title, contents } = props.card;
  return (
    <Card>
      <CardTitle> {title} </CardTitle>
      <CardText> {contents} </CardText>
    </Card>
  );
}
