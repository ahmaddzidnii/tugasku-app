import React from "react";

const CoridorClassPage = ({ params }: { params: { id: string } }) => {
  return <div className="text-3xl pt-16">{params.id}</div>;
};

export default CoridorClassPage;
