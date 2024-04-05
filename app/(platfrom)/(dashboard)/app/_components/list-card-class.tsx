import { CardClass } from "@/components/card/card-class";
import { getAllClass } from "@/service/get-all-class";

export const ListCardClass = async () => {
  const classes = await getAllClass();

  return (
    <div className="card-container">
      {classes.length === 0 ? (
        <p>No class found</p>
      ) : (
        classes.map((item, i) => (
          <CardClass
            key={i}
            name={item.name}
            classId={item.classId}
            teacherName={item.teacherName}
            description={item.description}
          />
        ))
      )}
    </div>
  );
};
