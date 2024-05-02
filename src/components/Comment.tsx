import { FC } from "react";

export const Comment: FC = () => {
  <RichCell
    before={<Avatar size={72} src={getAvatarUrl("")} />}
    subhead="Subhead"
    text="Text"
    caption="Caption"
    after="After"
    afterCaption="After Caption"
    bottom={
      <UsersStack
        photos={[getAvatarUrl(""), getAvatarUrl(""), getAvatarUrl("")]}
      >
        N общих друга
      </UsersStack>
    }
    actions={
      <ButtonGroup mode="horizontal" gap="s" stretched>
        <Button mode="primary" size="s">
          Primary
        </Button>
        <Button mode="secondary" size="s">
          Secondary
        </Button>
      </ButtonGroup>
    }
  >
    Children
  </RichCell>;
};
