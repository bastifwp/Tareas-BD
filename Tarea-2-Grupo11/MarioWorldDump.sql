PGDMP          %                {         
   MarioWorld    15.2    15.2 B    P           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            R           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            S           1262    16661 
   MarioWorld    DATABASE        CREATE DATABASE "MarioWorld" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "MarioWorld";
                postgres    false                        2615    17031    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            T           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            U           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    17032    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    17095    defensas    TABLE     f   CREATE TABLE public.defensas (
    id integer NOT NULL,
    defensa character varying(45) NOT NULL
);
    DROP TABLE public.defensas;
       public         heap    postgres    false    5            �            1259    17094    defensas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.defensas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.defensas_id_seq;
       public          postgres    false    5    224            V           0    0    defensas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.defensas_id_seq OWNED BY public.defensas.id;
          public          postgres    false    223            �            1259    17111    diplomacias    TABLE     �   CREATE TABLE public.diplomacias (
    id_reino_1 integer NOT NULL,
    id_reino_2 integer NOT NULL,
    es_aliado boolean NOT NULL
);
    DROP TABLE public.diplomacias;
       public         heap    postgres    false    5            �            1259    17081    karts    TABLE     �   CREATE TABLE public.karts (
    id integer NOT NULL,
    modelo character varying(45) NOT NULL,
    color character varying(45) NOT NULL,
    velocidad_maxima integer,
    id_personaje integer
);
    DROP TABLE public.karts;
       public         heap    postgres    false    5            �            1259    17080    karts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.karts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.karts_id_seq;
       public          postgres    false    220    5            W           0    0    karts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.karts_id_seq OWNED BY public.karts.id;
          public          postgres    false    219            �            1259    17106    personaje_habita_reino    TABLE     �   CREATE TABLE public.personaje_habita_reino (
    id_personaje integer NOT NULL,
    id_reino integer NOT NULL,
    fecha_registro timestamp(3) without time zone NOT NULL,
    es_gobernante boolean NOT NULL
);
 *   DROP TABLE public.personaje_habita_reino;
       public         heap    postgres    false    5            �            1259    17101    personaje_tiene_trabajo    TABLE     �   CREATE TABLE public.personaje_tiene_trabajo (
    id_trabajo integer NOT NULL,
    id_personaje integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_termino date
);
 +   DROP TABLE public.personaje_tiene_trabajo;
       public         heap    postgres    false    5            �            1259    17074 
   personajes    TABLE     �   CREATE TABLE public.personajes (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    fuerza integer NOT NULL,
    fecha_nacimiento date NOT NULL,
    objeto character varying(30)
);
    DROP TABLE public.personajes;
       public         heap    postgres    false    5            �            1259    17073    personajes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.personajes_id_seq;
       public          postgres    false    5    218            X           0    0    personajes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.personajes_id_seq OWNED BY public.personajes.id;
          public          postgres    false    217            �            1259    17116    reino_tiene_defensa    TABLE     l   CREATE TABLE public.reino_tiene_defensa (
    id_reino integer NOT NULL,
    id_defensa integer NOT NULL
);
 '   DROP TABLE public.reino_tiene_defensa;
       public         heap    postgres    false    5            �            1259    17088    reinos    TABLE     �   CREATE TABLE public.reinos (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    ubicacion character varying(45) NOT NULL,
    superficie integer NOT NULL
);
    DROP TABLE public.reinos;
       public         heap    postgres    false    5            �            1259    17087    reinos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reinos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reinos_id_seq;
       public          postgres    false    222    5            Y           0    0    reinos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reinos_id_seq OWNED BY public.reinos.id;
          public          postgres    false    221            �            1259    17067    trabajos    TABLE     ~   CREATE TABLE public.trabajos (
    id integer NOT NULL,
    descripcion character varying(45),
    sueldo integer NOT NULL
);
    DROP TABLE public.trabajos;
       public         heap    postgres    false    5            �            1259    17066    trabajos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.trabajos_id_seq;
       public          postgres    false    216    5            Z           0    0    trabajos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.trabajos_id_seq OWNED BY public.trabajos.id;
          public          postgres    false    215            �           2604    17098    defensas id    DEFAULT     j   ALTER TABLE ONLY public.defensas ALTER COLUMN id SET DEFAULT nextval('public.defensas_id_seq'::regclass);
 :   ALTER TABLE public.defensas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    17084    karts id    DEFAULT     d   ALTER TABLE ONLY public.karts ALTER COLUMN id SET DEFAULT nextval('public.karts_id_seq'::regclass);
 7   ALTER TABLE public.karts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    17077    personajes id    DEFAULT     n   ALTER TABLE ONLY public.personajes ALTER COLUMN id SET DEFAULT nextval('public.personajes_id_seq'::regclass);
 <   ALTER TABLE public.personajes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    17091 	   reinos id    DEFAULT     f   ALTER TABLE ONLY public.reinos ALTER COLUMN id SET DEFAULT nextval('public.reinos_id_seq'::regclass);
 8   ALTER TABLE public.reinos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    17070    trabajos id    DEFAULT     j   ALTER TABLE ONLY public.trabajos ALTER COLUMN id SET DEFAULT nextval('public.trabajos_id_seq'::regclass);
 :   ALTER TABLE public.trabajos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            ?          0    17032    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   �O       I          0    17095    defensas 
   TABLE DATA           /   COPY public.defensas (id, defensa) FROM stdin;
    public          postgres    false    224   MQ       L          0    17111    diplomacias 
   TABLE DATA           H   COPY public.diplomacias (id_reino_1, id_reino_2, es_aliado) FROM stdin;
    public          postgres    false    227   �Q       E          0    17081    karts 
   TABLE DATA           R   COPY public.karts (id, modelo, color, velocidad_maxima, id_personaje) FROM stdin;
    public          postgres    false    220   �Q       K          0    17106    personaje_habita_reino 
   TABLE DATA           g   COPY public.personaje_habita_reino (id_personaje, id_reino, fecha_registro, es_gobernante) FROM stdin;
    public          postgres    false    226   �R       J          0    17101    personaje_tiene_trabajo 
   TABLE DATA           h   COPY public.personaje_tiene_trabajo (id_trabajo, id_personaje, fecha_inicio, fecha_termino) FROM stdin;
    public          postgres    false    225   S       C          0    17074 
   personajes 
   TABLE DATA           R   COPY public.personajes (id, nombre, fuerza, fecha_nacimiento, objeto) FROM stdin;
    public          postgres    false    218   �S       M          0    17116    reino_tiene_defensa 
   TABLE DATA           C   COPY public.reino_tiene_defensa (id_reino, id_defensa) FROM stdin;
    public          postgres    false    228   yT       G          0    17088    reinos 
   TABLE DATA           C   COPY public.reinos (id, nombre, ubicacion, superficie) FROM stdin;
    public          postgres    false    222   �T       A          0    17067    trabajos 
   TABLE DATA           ;   COPY public.trabajos (id, descripcion, sueldo) FROM stdin;
    public          postgres    false    216   BU       [           0    0    defensas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.defensas_id_seq', 3, true);
          public          postgres    false    223            \           0    0    karts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.karts_id_seq', 10, true);
          public          postgres    false    219            ]           0    0    personajes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.personajes_id_seq', 16, true);
          public          postgres    false    217            ^           0    0    reinos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.reinos_id_seq', 10, true);
          public          postgres    false    221            _           0    0    trabajos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.trabajos_id_seq', 8, true);
          public          postgres    false    215            �           2606    17040 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            �           2606    17100    defensas defensas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.defensas
    ADD CONSTRAINT defensas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.defensas DROP CONSTRAINT defensas_pkey;
       public            postgres    false    224            �           2606    17115    diplomacias diplomacias_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_pkey PRIMARY KEY (id_reino_1, id_reino_2);
 F   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_pkey;
       public            postgres    false    227    227            �           2606    17086    karts karts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.karts DROP CONSTRAINT karts_pkey;
       public            postgres    false    220            �           2606    17110 2   personaje_habita_reino personaje_habita_reino_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_pkey PRIMARY KEY (id_reino, id_personaje);
 \   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_pkey;
       public            postgres    false    226    226            �           2606    17105 4   personaje_tiene_trabajo personaje_tiene_trabajo_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_pkey PRIMARY KEY (id_trabajo, id_personaje);
 ^   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_pkey;
       public            postgres    false    225    225            �           2606    17079    personajes personajes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.personajes
    ADD CONSTRAINT personajes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.personajes DROP CONSTRAINT personajes_pkey;
       public            postgres    false    218            �           2606    17120 ,   reino_tiene_defensa reino_tiene_defensa_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.reino_tiene_defensa
    ADD CONSTRAINT reino_tiene_defensa_pkey PRIMARY KEY (id_defensa, id_reino);
 V   ALTER TABLE ONLY public.reino_tiene_defensa DROP CONSTRAINT reino_tiene_defensa_pkey;
       public            postgres    false    228    228            �           2606    17093    reinos reinos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reinos
    ADD CONSTRAINT reinos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reinos DROP CONSTRAINT reinos_pkey;
       public            postgres    false    222            �           2606    17072    trabajos trabajos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.trabajos
    ADD CONSTRAINT trabajos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.trabajos DROP CONSTRAINT trabajos_pkey;
       public            postgres    false    216            �           2606    19455 '   diplomacias diplomacias_id_reino_1_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_1_fkey FOREIGN KEY (id_reino_1) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_1_fkey;
       public          postgres    false    222    227    3229            �           2606    19460 '   diplomacias diplomacias_id_reino_2_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_2_fkey FOREIGN KEY (id_reino_2) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_2_fkey;
       public          postgres    false    3229    227    222            �           2606    17121    karts karts_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public.karts DROP CONSTRAINT karts_id_personaje_fkey;
       public          postgres    false    220    3225    218            �           2606    19445 ?   personaje_habita_reino personaje_habita_reino_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_personaje_fkey;
       public          postgres    false    226    218    3225            �           2606    19450 ;   personaje_habita_reino personaje_habita_reino_id_reino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_reino_fkey;
       public          postgres    false    3229    226    222            �           2606    19440 A   personaje_tiene_trabajo personaje_tiene_trabajo_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE CASCADE;
 k   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey;
       public          postgres    false    3225    218    225            �           2606    19435 ?   personaje_tiene_trabajo personaje_tiene_trabajo_id_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey FOREIGN KEY (id_trabajo) REFERENCES public.trabajos(id) ON UPDATE CASCADE ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey;
       public          postgres    false    225    3223    216            �           2606    19470 7   reino_tiene_defensa reino_tiene_defensa_id_defensa_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reino_tiene_defensa
    ADD CONSTRAINT reino_tiene_defensa_id_defensa_fkey FOREIGN KEY (id_defensa) REFERENCES public.defensas(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.reino_tiene_defensa DROP CONSTRAINT reino_tiene_defensa_id_defensa_fkey;
       public          postgres    false    228    3231    224            �           2606    19465 5   reino_tiene_defensa reino_tiene_defensa_id_reino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reino_tiene_defensa
    ADD CONSTRAINT reino_tiene_defensa_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.reino_tiene_defensa DROP CONSTRAINT reino_tiene_defensa_id_reino_fkey;
       public          postgres    false    222    3229    228            ?   E  x�}�]jA��gO����Vk���V��6N���l Y0�I%���9<Y��&X��J�ZC��#,��T��`tk�*�R͔�N�x2"%��
ן���F�q-$X/@�3i������i�����}{z�ηJp�vU�i���ܬR9ȡt@*�"[��ΰ���t��D�/� =<�Q�ґL0��Q�=�[
"���l���?��^q��yP��7Ds�.G��H��2���9��%6�@�,��j�L;Jpv�&�v" ���H��gא��s�?� <�^�]��Ȋ򷃊��m���y/����t>�N_����      I   4   x�3�t�J-J�,�WHIU���/H,�2D�OL)�Q�T�M,������� ���      L   E   x�-���@k<L*c{��3A�W0��tD!�E�ľ��M�>�H����$Ų�M�l1�ߖn����<OD�|U�      E   �   x�5���0F�ۧ�Z@`�Ŀ�8�+T���)e�������a�g�^~�m��BaZ�p@F8���F��)j�ak1�)	a�:+�B����$k�e��D�K-�ua�w
8��E$��kT3F��k������^�@��:Z�����0DCA
�C]�u�蟏M�������>�      K   ^   x�u���0��,䤅6�	�_@A�>��;��@�EeV��\Z���Q����M�1=VQzg�W�Yg%T�4m�Z�r�ۋn���u��!�      J   `   x�]���0E�5��F<�D*H�uğ�"�:�BH���A��ܗ��G��)0�G�%X�|�W7W�^jBҰgQ�w��}�NWcutqz����OU$C      C   �   x�M�MN1F��)�Aq�e&Kh]T!6H�X��	ƣ��ʵ8#	 !ŋ�=}����Sh��@�_�����$����0�
��=�S�n��F�x����#O��/��a�0���%g�v�X幸�#Yxc��m�l��M�W1��[yא�����u��9�~|}N���0O�.�'�?��`���G�hY���ܵ��`�Q/� ���V�d�+V��+D�DyS$      M      x�3�4�2�4����� >�      G   �   x�m�A
�@�ur�9�̨mu�JDŅ�&؁jRf���Ћ�2��d����ΞEͮ�g��[N-����ma��b�Վ��tI���-��Ɔ�09�8�D#��A�S�o������P�H#��|U�~g��
W�Q�-������Y7      A   �   x�%�K
�@�ӧ�H\�!wEq!�y�6Lz��	Oo�oU�6��$�{6)0p�b5�����,Q���h#4~`���Q�Y=����v��\,� ��*���.	��m	��E��OH���+"�un-n     