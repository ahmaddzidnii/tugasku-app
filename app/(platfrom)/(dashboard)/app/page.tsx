import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export async function generateMetadata() {
  const user = await currentUser();
  return {
    title: `${user?.username} - Dashboard`,
    description: "Dashboard",
  };
}

const PlatformMainPage = async () => {
  return (
    <div className="pt-16 px-5 text-justify">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum iste culpa
      mollitia odio maiores reprehenderit. Quia obcaecati voluptatibus,
      reprehenderit debitis accusamus architecto ipsam, culpa amet temporibus
      nihil placeat doloribus tempore modi praesentium sunt dolorem iste! Culpa
      dolores maxime saepe assumenda ratione corporis temporibus accusamus
      earum, debitis reprehenderit eum, maiores reiciendis quos natus!
      Blanditiis repudiandae maiores molestias dolores distinctio. Voluptatum,
      aliquid necessitatibus velit eligendi provident, sapiente eum quos
      accusantium ipsa, similique at laboriosam! Maxime debitis unde officia.
      Rem excepturi blanditiis voluptatibus eveniet minima voluptatum doloremque
      voluptate minus, culpa iure nostrum repellat hic illum amet numquam
      laudantium maxime error quisquam atque dignissimos consectetur voluptatem
      delectus natus. Quo atque libero tempora deleniti. Maiores, reiciendis
      numquam esse porro cumque provident illum pariatur molestias rem harum
      perferendis dolor libero, consectetur aliquam, ipsum voluptas distinctio!
      Ea, possimus fuga. Iure quidem non dolorem omnis nulla itaque unde quam,
      similique fugit, ut optio quae dolorum velit fugiat exercitationem commodi
      maiores dicta expedita quos tenetur! Fuga nesciunt labore enim
      exercitationem esse minus incidunt animi placeat accusamus quos
      voluptatibus numquam debitis temporibus soluta quasi beatae cum fugit
      sequi, hic, ex ipsa! Beatae quos nostrum quis modi, dolorem reprehenderit
      vitae minima eligendi et, necessitatibus excepturi quo sed quaerat, soluta
      vero! Repellat veniam, nulla, quaerat qui fuga repellendus dolore facere
      sed aspernatur magni illum iste nam illo atque? Cumque veritatis, debitis
      recusandae at suscipit, natus quo magnam vero alias aut reprehenderit quod
      excepturi aliquam dignissimos sequi? Nihil est culpa autem. Cumque
      corrupti ipsam quaerat accusamus itaque et iusto dolorum molestiae hic
      iure architecto labore, earum sequi exercitationem, sed rem cupiditate
      asperiores voluptas facilis. Soluta voluptatibus illum magni animi dolorum
      nihil fugit sunt laudantium neque explicabo labore perferendis iusto esse
      fugiat aliquam facilis quia consequuntur modi autem porro voluptatum, quis
      velit molestiae? Assumenda maiores fuga excepturi aperiam suscipit, iste
      totam iusto error aut inventore mollitia ipsa eius placeat fugiat beatae
      illo dolore pariatur magnam id dolorem doloribus debitis et. Quidem animi
      esse, deleniti maiores molestiae vitae tempore officia hic quis nisi ad
      accusantium corporis facilis delectus qui omnis atque iure perferendis
      error quo quae necessitatibus aut! Mollitia, enim odio! Odit sequi autem
      ipsam dignissimos fuga illum, harum earum quas, reprehenderit consectetur
      veniam nisi, molestias laborum quia beatae. Officia est odit nihil! Nulla
      commodi sit ab voluptates error cumque architecto quam? Alias tenetur
      minima expedita facilis blanditiis consequatur voluptate omnis? Deserunt,
      quo. Nesciunt natus corporis itaque nam, adipisci voluptas tenetur!
      Aliquid fugiat earum unde natus perferendis dolor vero laudantium ut sint
      ullam quisquam dignissimos odio autem molestiae qui iusto ipsam assumenda,
      amet repellendus. Dignissimos est sunt repudiandae, eaque iusto, nostrum
      reprehenderit inventore impedit iste beatae molestias, omnis odio unde
      maxime soluta nihil delectus quae nulla officiis ipsam! Sit odio eligendi
      ipsa placeat, officiis eos perferendis at laborum, sed dolores temporibus
      voluptas vero. Tempora numquam omnis quos iusto consequatur eos
      consectetur et quas error dicta architecto mollitia laudantium, officia
      aperiam labore asperiores voluptas exercitationem maiores, eveniet fugiat.
      Quaerat deleniti, minus, nisi eligendi numquam, reiciendis aperiam ullam
      tenetur quasi itaque dolor maiores vero. Necessitatibus nobis deleniti
      nesciunt assumenda laboriosam, ullam architecto, commodi debitis ipsum
      ipsa nemo aut fugit natus in saepe. Voluptas ipsum et adipisci dolorem
      praesentium. Natus iusto asperiores modi pariatur unde in sequi, nulla
      quos! Similique dolore vitae ducimus vel optio dignissimos porro quibusdam
      distinctio fuga, corrupti excepturi amet eaque, deserunt obcaecati
      asperiores reprehenderit ut harum pariatur voluptatum consequatur nesciunt
      enim quasi cumque? Fugit laboriosam minus incidunt vitae doloremque
      repellendus ducimus! Laborum numquam aliquam dolorum, quibusdam explicabo
      alias esse quas voluptatem quam ducimus suscipit aperiam ipsa similique
      tempora amet fugit dolor? Tenetur, quia enim tempore eos vero fugiat non
      nostrum error, unde, consectetur maiores voluptatibus ex laudantium porro
      at quos exercitationem magnam corrupti provident saepe debitis sed in
      explicabo inventore. Quam optio incidunt pariatur voluptatibus quis
      quibusdam earum totam, necessitatibus suscipit minima excepturi a ad
      dolorem minus quaerat, obcaecati ratione asperiores perspiciatis
      recusandae eligendi ducimus iste molestias? Architecto ullam inventore
      saepe ipsam nesciunt, molestiae nemo. Facilis ad harum ut corporis
      voluptatum, odio cum natus maiores temporibus enim rem quod nisi sint sunt
      consequatur, possimus repellendus aliquam, alias quos doloremque autem
      ratione labore debitis! Repellendus rerum explicabo iusto dicta illo eaque
      qui suscipit pariatur, deserunt doloremque exercitationem laudantium eius
      quia et, fugit consequuntur adipisci sit dolor odit. Veritatis esse est
      quisquam sint delectus aut aliquid officia, eligendi sunt recusandae omnis
      deleniti. Minus ea molestias voluptates, non harum molestiae nobis dolor.
      Reprehenderit minus voluptates dicta distinctio iusto, ad nihil labore
      sapiente consequuntur recusandae nesciunt maiores culpa libero, ipsum
      doloremque repellat ipsa voluptate voluptatum exercitationem tempore
      asperiores natus? Deserunt, ex est asperiores neque minima quibusdam animi
      error vero repudiandae veniam eligendi? Necessitatibus debitis quisquam
      maiores voluptate rem a temporibus quaerat, tempora, vel et assumenda
      totam dicta laborum nostrum officia doloribus, pariatur deserunt
      distinctio deleniti? Nobis eos iste quasi sed sint ut odit praesentium,
      repellat fugiat consequuntur illo, numquam repellendus reiciendis vitae,
      itaque cumque dolore quis! Enim rerum voluptate aperiam dolor eum
      reiciendis saepe optio commodi quisquam, inventore dolorum sapiente modi
      aliquam iure reprehenderit quas doloremque corporis porro vitae
      consequatur? Quibusdam laborum accusantium rerum explicabo blanditiis
      voluptatibus perferendis porro a, perspiciatis eligendi voluptate
      consectetur optio. Perspiciatis ipsa molestiae iste nemo quae, minima
      excepturi ad ipsam corrupti temporibus iusto accusamus ullam. Ipsam
      voluptate ipsa repellat consectetur rem id maxime tempora fugiat,
      architecto laboriosam quae consequuntur, modi at! Enim cum quae unde
      aspernatur voluptatum beatae, delectus temporibus. Quis ullam incidunt,
      ducimus officia minima consectetur cumque quam quia quisquam ipsa eum
      voluptate. Laborum repellendus suscipit quis optio est qui corrupti
      assumenda cum accusantium placeat labore quam repudiandae nisi, neque
      expedita voluptatibus ratione a soluta! Modi et inventore aperiam autem
      neque natus sed officiis! Amet numquam id officia dignissimos eius magni
      magnam commodi esse totam beatae quidem aut vel voluptatum et, inventore
      repudiandae nulla ab ipsam blanditiis illo expedita aspernatur repellat
      deserunt saepe. Ipsa ut sed quidem quasi illo quia vitae, dicta eum sit
      quis! Quis esse mollitia et, pariatur quam veritatis alias ratione fugiat
      dolor inventore rem iusto nobis dolorem voluptatum reiciendis molestias
      ullam ab corporis nihil voluptatibus minima deleniti soluta.
    </div>
  );
};

export default PlatformMainPage;
