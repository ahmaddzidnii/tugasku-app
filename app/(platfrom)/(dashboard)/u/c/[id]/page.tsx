import { getClassById } from "@/service/get-all-class";
import { CoridorClassHeader } from "./_components/coridor-classs-header";

const CoridorClassPage = async ({ params }: { params: { id: string } }) => {
  const classById = await getClassById(params.id);
  return (
    <div className="text-3xl px-4 flex flex-col">
      <CoridorClassHeader classData={classById!} />
    </div>
  );
};

export default CoridorClassPage;
