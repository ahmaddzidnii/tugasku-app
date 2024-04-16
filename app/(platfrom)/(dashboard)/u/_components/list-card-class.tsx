import { CardClass } from "@/components/card/card-class";
import { EmptyDataUi } from "@/components/error-components/empty-data-ui";
import { getAllClass } from "@/service/get-all-class";

export const ListCardClass = async () => {
  const classes = await getAllClass();

  return (
    <>
      {classes.length === 0 ? (
        <div className="w-full mt-5">
          <EmptyDataUi
            text="Tidak Ada Kelas!"
            svgClassName="w-[200px] h-[200px]"
            textClassName="text-base md:text-lg lg:text-3xl"
          />
        </div>
      ) : (
        <div className="card-container">
          {classes.map((item, i) => (
            <CardClass
              key={i}
              name={item.name}
              classId={item.classId}
              teacherName={item.teacherName}
              description={item.description}
              image={item.bannerImageUrl}
            />
          ))}
        </div>
      )}
    </>
  );
};
