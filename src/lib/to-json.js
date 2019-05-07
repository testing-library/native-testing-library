const tree = {
  type: 'View',
  props: {},
  children: [
    {
      type: function ParentComponent() {},
      props: {},
      children: [
        {
          type: 'View',
          props: {},
          children: [
            {
              type: function MiddleComponent() {},
              props: {},
              children: [
                {
                  type: 'View',
                  props: {},
                  children: [
                    {
                      type: 'Text',
                      props: {},
                      children: ['hello'],
                    },
                  ],
                },
                {
                  type: 'Text',
                  props: {},
                  children: ['world'],
                },
              ],
            },
          ],
        },
        {
          type: 'Text',
          props: {},
          children: ['hello', ' ', 'world'],
        },
      ],
    },
  ],
};

function flat(arr) {
  return arr.reduce((arr, toFlatten) => {
    return arr.concat(Array.isArray(toFlatten) ? flat(toFlatten) : toFlatten);
  }, []);
}

function toJSON(node) {
  if (typeof node === 'string') {
    return node;
  }

  const { children, ...props } = node.props;

  let renderedChildren = [];
  if (node.children && node.children.length) {
    for (let i = 0; i < node.children.length; i++) {
      const renderedChild = toJSON(node.children[i]);

      renderedChildren.push(renderedChild);
    }
  }

  renderedChildren = flat(renderedChildren);

  if (node.parent === null) {
    return renderedChildren[0];
  }

  if (typeof node.type !== 'string') {
    return renderedChildren;
  }

  const json = {
    type: node.type,
    props,
    children: renderedChildren,
  };
  Object.defineProperty(json, '$$typeof', {
    value: Symbol.for('react.test.json'),
  });
  Object.defineProperty(json, 'parent', {
    value: node.parent,
  });
  return json;
}

export { toJSON };
