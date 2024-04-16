import { SettingClass } from "./_components/settings-class";

export default function ClassSettingsPage({ params }: { params: { id: string } }) {
  const classId = params.id;
  return (
    <div>
      <SettingClass classId={classId} />
    </div>
  );
}
