
export const normalize = (entityList) => {
  const result = {

  };

  for (const entity of entityList) {
    result[entity.id + ''] = {
      ...entity
    };
  }

  return result;
}
