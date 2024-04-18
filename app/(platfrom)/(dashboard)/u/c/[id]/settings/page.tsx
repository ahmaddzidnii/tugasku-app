import { Separator } from "@/components/ui/separator";
import { ClassSettingsForm } from "./_components/class-settings-form";
import { getClassById } from "@/service/get-all-class";
import { DangerousSettingsClass } from "./_components/dangerous-settings-class";

export default async function ClassSettingsPage({ params }: { params: { id: string } }) {
  const classId = params.id;
  const detailClass = await getClassById(classId);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Kelas</h3>
        <p className="text-sm text-muted-foreground">Atur pengaturan kelas ini</p>
      </div>
      <Separator />
      <ClassSettingsForm detailClass={detailClass} />

      <div className="mt-6 border-destructive/20 border rounded-lg px-4 py-5 bg-destructive/10">
        <h3 className="text-lg font-medium">Visibilitas Class</h3>
        <p className="text-sm text-muted-foreground">Atur visibilitas kelas ini</p>
        <Separator className="my-4 bg-destructive/20" />
        <DangerousSettingsClass detailClass={detailClass} />
      </div>
    </div>
  );
}
